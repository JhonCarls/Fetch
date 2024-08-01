from PIL import Image, ImageDraw, ImageFont

# Load the existing logo image
logo_path = '/mnt/data/logo.png'
original_logo = Image.open(logo_path)

# Create a new image with the same size as the original
new_logo = Image.new('RGBA', original_logo.size, (255, 255, 255, 0))

# Set up the drawing context
draw = ImageDraw.Draw(new_logo)

# Define the font and size (you might need to adjust the path and size)
font_path = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
font_size = 150
font = ImageFont.truetype(font_path, font_size)

# Define text properties
text = "A P"
text_position = (50, 50)  # Adjust the position as needed
text_color = (128, 0, 128)  # Purple color

# Draw the text onto the new image
draw.text(text_position, text, font=font, fill=text_color)

# Combine the new logo with the original logo
combined_logo = Image.alpha_composite(original_logo, new_logo)

# Save the new logo
output_path = '/mnt/data/new_logo.png'
combined_logo.save(output_path)

print(f"New logo saved to {output_path}")
