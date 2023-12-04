import React, { useState } from 'react';
import './App.css';

function App() {
  const [birthDate, setBirthDate] = useState('');
  const [ageDifference, setAgeDifference] = useState(null);

  const calculateAgeDifference = () => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    const difference = today - birthDateObj;
    //burdaki çevirmeler için bu yorum önemli.
    // program milisaniye bazında çalışıyor. 1000 mlisaniye 1 saniye. 60 saniye 1 dk. 60 dk 1 saat.24 saat 1 gün
    const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365.25));//365.25 gün 1 yıl ediyor
    const months = Math.floor((difference % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30));//bir yılı 30 a bölüyoruz(çünkü bir ayda 30 gün var) sonrasında farkın modunu alıyoruz ve kalan  bizim  ayımızı veriyor
    const days = Math.floor((difference % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));// ay formülümüzü de saat formülümüze bölüyoruz . farkın formüle göe modu  bize günü veriyor.
    // bu formülleri  çıkartabilmek için önce yıl sonra ay sonra gün  şeklinde  büyükten küçüğe doğru buluyoruz.
    // https://stackoverflow.com/a/51157338
    // yukarıdaki linkte bunun açıklaması verilmiştir
    setAgeDifference({
      years,
      months,
      days,
    });
  };

  return (
    <div className="app">
      <h1>Yaşam Süresi Hesaplayıcı</h1>
      
      <label>Doğum Tarihi:</label>
      <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
      <br></br>
      <button onClick={calculateAgeDifference}>Hesapla</button>

      {ageDifference && (
        <div className="result">
          <p>{`Yaş: ${ageDifference.years} yıl, ${ageDifference.months} ay, ${ageDifference.days} gün`}</p>
          <p> Kadar Yaşamışsın</p>
          {ageDifference.years < 25 && <p>Çok Gençsiniz </p>}
          {ageDifference.years >= 25 && ageDifference.years <= 45 && <p>Yetişkinsiniz</p>}
          {ageDifference.years > 45 && <p>Yaşlısınız</p>}
          
        </div>
      )}
    </div>

  );



}

export default App;
