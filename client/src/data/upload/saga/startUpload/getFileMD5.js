import SparkMD5 from 'spark-md5';

const getFileMD5 = async file => new Promise(resolve => {
  const chunkSize = 100000;
  const chunks = Math.ceil(file.size / chunkSize);
  const md = new SparkMD5.ArrayBuffer();
  let chunk = 0;
  let fileChunks = [];

  function onload(e) {
    const data = e.target.result;
    md.append(data);
    chunk++;

    if (chunk < chunks) {
      read_next_chunk();
    } else {
      resolve({
        md5: md.end(),
        chunks: fileChunks,
      });
    }
  };

  function read_next_chunk() {
    var reader = new FileReader();
    reader.onload = onload;
    const start = chunk * chunkSize;
    const end = Math.min(start + chunkSize, file.size);
    const fileChunk = file.slice(start, end);
    fileChunks.push(fileChunk);

    reader.readAsArrayBuffer(fileChunk);
  };

  read_next_chunk();
});

export default getFileMD5;
