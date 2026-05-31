#!/bin/bash
mkdir -p media/webp
mkdir -p media/webp/antes-e-depois

# Map original -> new name
declare -A images=(
  ["media/IMAGEM 1.png"]="media/webp/hero-smileshift-v34.webp"
  ["media/IMAGEM 2.png"]="media/webp/produto-smileshift.webp"
  ["media/3omin-1.jpg"]="media/webp/acao-v34-30-minutos.webp"
  ["media/seguro (1).png"]="media/webp/compra-segura-smileshift.webp"
  ["media/Antes e depois/1.png"]="media/webp/antes-e-depois/manchas-amarelas-antes-1.webp"
  ["media/Antes e depois/2.png"]="media/webp/antes-e-depois/dentes-brancos-depois-1.webp"
  ["media/Antes e depois/3.png"]="media/webp/antes-e-depois/manchas-amarelas-antes-2.webp"
  ["media/Antes e depois/4.png"]="media/webp/antes-e-depois/dentes-brancos-depois-2.webp"
)

# Convert main images
for orig in "${!images[@]}"; do
  dest="${images[$orig]}"
  if [ -f "$orig" ]; then
    cwebp -q 80 "$orig" -o "$dest" 2>/dev/null
    w=$(sips -g pixelWidth "$dest" 2>/dev/null | grep -Eo '[0-9]+$')
    h=$(sips -g pixelHeight "$dest" 2>/dev/null | grep -Eo '[0-9]+$')
    echo "Converted $orig -> $dest ($w x $h)"
  fi
done

# Convert portraits
for i in {1..6}; do
  orig=$(ls media/portrait_${i}_*.png 2>/dev/null | head -n 1)
  if [ -n "$orig" ]; then
    dest="media/webp/cliente-smileshift-${i}.webp"
    cwebp -q 75 "$orig" -o "$dest" 2>/dev/null
    w=$(sips -g pixelWidth "$dest" 2>/dev/null | grep -Eo '[0-9]+$')
    h=$(sips -g pixelHeight "$dest" 2>/dev/null | grep -Eo '[0-9]+$')
    echo "Converted $orig -> $dest ($w x $h)"
  fi
done

