import { useRef, useState } from 'react';

function FileUpload() {
  const inputRef = useRef(null);
  const [fileName, setFileName] = useState('');

  function handleClick() {
    inputRef.current.click();
  }

  function handleChange(e) {
    if (e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  }

  return (
    <section>
      <h2>Выбор файла</h2>

      <input
        ref={inputRef}
        type="file"
        onChange={handleChange}
        style={{ display: 'none' }}
      />

      <button onClick={handleClick}>
        Выбрать файл
      </button>

      {fileName && (
        <p style={{ marginTop: 10 }}>
          Выбран файл: <strong>{fileName}</strong>
        </p>
      )}
    </section>
  );
}

export default FileUpload;