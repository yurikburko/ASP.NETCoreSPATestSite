using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.Drawing;

namespace SPATestSite.Helpers
{
    public class ImageHelper
    {
        public const string JpegContentType = "image/jpeg";

        public static Stream ScaleImageWithCropFit(Stream stream, int width, int height)
        {
            return ScaleImage(stream, width, height, withCrop: true);
        }

        private static Stream ScaleImage(Stream stream,
            int width,
            int height,
            bool withCrop)
        {
            using (var image = Image.FromStream(stream))
            {
                using (var newImage = new Bitmap(width, height, PixelFormat.Format32bppArgb))
                {
                    using (var graphics = Graphics.FromImage(newImage))
                    {
                        graphics.InterpolationMode = InterpolationMode.HighQualityBicubic;
                        graphics.PixelOffsetMode = PixelOffsetMode.HighQuality;

                        DrawScaledImage(graphics, 0, 0, width, height, image, withCrop: withCrop);

                        return SaveAsJpeg(newImage);
                    }
                }
            }
        }

        public static MemoryStream SaveAsJpeg(Image image)
        {
            var imageCodecInfo = GetEncoderInfo(JpegContentType);

            var encoderParameters = new EncoderParameters(1);
            encoderParameters.Param[0] = new EncoderParameter(Encoder.Quality, 100L);

            var stream = new MemoryStream();
            image.Save(stream, imageCodecInfo, encoderParameters);

            stream.Position = 0;
            return stream;
        }

        public static void DrawScaledImage(Graphics graphics,
            int translateX,
            int translateY,
            int width,
            int height,
            Image image,
            bool withCrop)
        {
            if (image == null)
            {
                return;
            }
            using (var transform = new Matrix())
            {
                transform.Translate(translateX, translateY);

                var ratioX = (float)width / image.Width;
                var ratioY = (float)height / image.Height;

                var ratio = withCrop ? Math.Max(ratioX, ratioY) : Math.Min(ratioX, ratioY);

                var originalShiftX = (image.Width - (int)(width / ratio)) / 2;

                var originalShiftY = (image.Height - (int)(height / ratio)) / 2;

                transform.Scale(ratio, ratio);

                graphics.Transform = transform;

                var imageWidth = image.Width - 2 * originalShiftX;
                var imageHeight = image.Height - 2 * originalShiftY;

                DrawImageWithoutGhostBorder(image, graphics,
                    imageWidth,
                    imageHeight,
                    originalShiftX, originalShiftY, imageWidth, imageHeight);
            }
        }

        public static ImageCodecInfo GetEncoderInfo(String mimeType)
        {
            return ImageCodecInfo.GetImageEncoders().FirstOrDefault(enc => enc.MimeType == mimeType);
        }

        public static bool IsValidImageStream(Stream stream)
        {
            long initPosition = stream.Position;
            try
            {
                using (Image.FromStream(stream, false, false)) { }
                return true;
            }
            catch (Exception)
            {
                return false;
            }
            finally
            {
                stream.Position = initPosition;
            }
        }


        private static void DrawImageWithoutGhostBorder(Image image,
            Graphics graphics,
            int destWidth,
            int destHeight,
            int srcX,
            int srcY,
            int srcWidth,
            int srcHeight)
        {
            var attributes = new ImageAttributes();
            attributes.SetWrapMode(WrapMode.TileFlipXY);
            graphics.DrawImage(image, new Rectangle(0, 0, destWidth, destHeight), srcX, srcY, srcWidth, srcHeight, GraphicsUnit.Pixel, attributes);
        }
    }
}
