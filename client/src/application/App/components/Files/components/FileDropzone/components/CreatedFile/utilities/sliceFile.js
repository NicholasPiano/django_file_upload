const sliceFile = (file, numberOfChunks) => {
  var byteIndex = 0;
  var chunks = [];

  for (var i = 0; i < numberOfChunks; i += 1) {
    var byteEnd = Math.ceil((file.size / numberOfChunks) * (i + 1));
    chunks.push(file.slice(byteIndex, byteEnd));
    byteIndex += (byteEnd - byteIndex);
  }

  return chunks;
};

export default sliceFile;
