import cv2
import os
import sys

# Script para extrair frames do vídeo e gerar imagens soltas para Canvas sequence

def process_video(video_path, output_dir):
    # Ensure output exists
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    # Open the video
    vidcap = cv2.VideoCapture(video_path)
    
    # Get frame rate and dimensions
    fps = vidcap.get(cv2.CAP_PROP_FPS)
    total_frames = int(vidcap.get(cv2.CAP_PROP_FRAME_COUNT))
    width = int(vidcap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(vidcap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    
    print(f"Video {video_path}")
    print(f"Dimensions: {width}x{height}")
    print(f"FPS: {fps}")
    print(f"Total Frames: {total_frames}")
    
    # Calculate skip factor to target ~60 frames total for this effect, or keep all if we want buttery smooth
    # Apple websites often use 60-120 frames maximum for an entire scroll sequence to save RAM.
    # Let's extract max 150 frames to balance RAM and smoothness.
    target_frames = 150
    skip_frames = max(1, total_frames // target_frames)
    
    print(f"Extracting 1 frame every {skip_frames} frames to {output_dir}")

    success, image = vidcap.read()
    count = 0
    saved_count = 0
    
    while success:
        if count % skip_frames == 0:
            # Resize image to something manageable for web (e.g. 720p height max or 1080p height max)
            # WebP is ideal for web payload 
            target_height = 1080
            aspect_ratio = width / height
            target_width = int(target_height * aspect_ratio)
            resized_image = cv2.resize(image, (target_width, target_height), interpolation=cv2.INTER_AREA)

            # Build zero-padded filename: 0001.webp, 0002.webp
            frame_name = f"{saved_count:04d}.webp"
            frame_path = os.path.join(output_dir, frame_name)
            
            # Save as WebP with 80% quality
            cv2.imwrite(frame_path, resized_image, [int(cv2.IMWRITE_WEBP_QUALITY), 80])
            saved_count += 1
            
        success, image = vidcap.read()
        count += 1
        
    print(f"Extraction complete! Saved {saved_count} frames.")

if __name__ == "__main__":
    video_path = "/Users/vitorcardoso/Desktop/Smileshift/raw_files/VIDEO 2.mp4"
    output_dir = "/Users/vitorcardoso/Desktop/Smileshift/raw_files/sequence"
    process_video(video_path, output_dir)
