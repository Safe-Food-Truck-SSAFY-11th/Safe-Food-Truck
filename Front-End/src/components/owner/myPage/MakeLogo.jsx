import styles from "./MakeLogo.module.css";
import alertImg from "assets/images/alert.png";
import { useState } from "react";
import axiosInstance from 'utils/axiosInstance';  

const MakeLogo = ({ closeMakeLog, storeName, storeType, translateResult }) => {
  const [aiImageURL, setAIImageURL] = useState("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAz1BMVEX///8A3P359/jl4eWsnakAwvyAbnv/+PjK8Pnb8/kA3f0A2v38+PjR8vkAv/xc4vyh6vpQ4/yw7vqomKX39fbw7vDr6OsAxPx8aXfp5enz8fMAyfzu9vjK6fkA1/0Axvx85/sA0P3Y7vm37vrn9fiO6fty5vuEaHS0prHBtr931vul4vo83/2X6vuy7vpToriLeYaXhpPa1NmI2vpPzvta0Puw5PmO2/oyvdhDscokx+V3doRyfY1hkqY8t9Gq4vppiZqSqbbF3OSRgo3MxMpFmVg8AAAK1klEQVR4nO2daWPauBaGwSwCI5ZgQ4A4gYYl0Jo0yTRtp53t3ub//6ax8ablSF4wMXj09lOIY/T4rJJlt1JRUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUrowaYd/pxbWipJpzmaj8bTmazodj8yceYuDo2TOIsxabTzKi7JoLlrmuEZobB6NdybWozSjII+zZNEsIjGGzMxYNIdUo+MZi0aIFW3H8vE5Mqck46x8gBrjqtMUrlr0wJPLrGUyY9HDTiXKUxNGY9FjTqlxak8tesSpRQVjLR6x6PFm0CwVYszJ8DkoBlHeqsrgEEJWu9sqQLek7tsWxojGTG5FGV530Lf16vur4+ru7sO856nRuJ6/frqnIZPGohBPa22qnQLoCOm6fvfhuuHLAf14qxGQNGI6QIxWe7tgPF8O5LwRQc6/WREjXTTSACJrXYRvCuQw3vQiyOvfLBQMNEHphw04KBqKkcMY+qrD2PgU5Nb4Bg40YPtM/JOUXv3QIBi/3KNk2QYEPDcD+qLM2HDMCPgpH4qAh+JF0Sgi6Z05acaPnqfK/RQANK+KBpHphvJUE/N+Ggto2UVDSKXTiBaOyac8oHbegFXWihqWJhvAhP2iAeJFxeKr3Ih8Fj3bJEOKzKi9j0hiRB5wWPTgk0i/I2tG76uLWIONyLnoSnhWez8MNVhv9LiGoKP31/vBcJ/g0MOg18PIezpXgyGnPZEfdLL0NxorLEqnvAmFdaKPaOG21J31dVeLDt3HNri65RzYDg5bI1BkhiBDsfEFi2pich/VLXaCjZElZLSH5PzGnWMu5SW203IdLeikbPiuELaiCwX4KTjHYM9hCa/1FfClGLXg49caYo9FeCizY8c7Ydf7acH9uf+FxGWiqmJjbsHTfXbUkm60D15WtAKGrbfAAaKVrM5ShBsBIVWpO5QRPyEm14zgMBRfZpgQQrQtkQU0SaWlCKsr+Bq1qAtJGfFaA92UPcNQnPRCwsOaFwqjjP5W94vN8FrgINOEfypGpAntrkYurXkLbSYTE7QR/8ZQSWQJJW7kEaKhfVB/0Qq+H61pwFXIbrYW/b7d3yzDFQdJQ0gTOowHDQ+2RBvvJ/ZaUun0BjPZ1OQBcVdSt3zCQXiIHUYbdWWDT5FGLIFsAq8Tl1uW0NPAI4TzMF0Te/eYD0TWhGvwRDRh9EnH+3o6PQVZEC2hoUrKUQZCxk2/IT4QUzgpQOjXMEfRR7rln2rPDmYTOKpgtFkI6VxzwwYiR4jbEkCIsKr7OFHh3yMYsBpWANa4RxHSrVsbcxWRIRR8t5jQB8KtMDh95BYQ0KFTw56SiZDua24R27gxFU4+bQIJbW9cYScUVGq4rK6gUxxDyATib4hNNWwYSme+IGG1e/g0KHOdJZIw+Px4BWbsTIQ6tfD2iuhpMEcoX7yACT03Da3v10LRibzmHYEWzkZIpZov3ESfCUNx1y0m9MwSJBbfaYUZ69Gv3ycidLpvplwwhOK5r5jwyvNvP0f1pU7KXo88CKlker3C+RP6VmtRBMKMdSW5AjkQNhjCWh6EukkObBFDaHu/B9uaHAh7ivA/4KUZcqn/6aP/k8RGrnwbgw3+O2QayRqNmJAes+35rLBaLL1zgJ1FNsJU1SJTxWcqnFfxRdOHqjfxKKziZ+ramCbmUeqmnsFx+2RdG44jlE2AYcK+32nSP2sY9ga/aQMLfh6d9zem855xsyd2TQkipM3TZbE9CDgSlz4+HO5ZCNnZE+YWahhCabmACINJbTSAhXiau/Z/9QifPxMhm0pjZsCJVjFIQq/c04HlBybH0dkH61aCL8lEyN67iFnFEEWIiNAOaMgMFcyBUZsi0Zco5juyEHKr3nErUYK5KUUYribqC80HpMN3GKwbomHIaO+D+xiIRTiGkOvZgGV91oiS+0MeIW71N67Wy2jdnXG7bvALhNuDhXPsoBvep5HMQbMQsk4KbDZlCZexq/oYMSv1XBeqR+yYPlS6ByID4V2PNOFXlGBVP8udmT13UfS24M4Mku1iSU/ItGwauDOKu7smvokPEmIAsOrGInSw6GZjVkLuFil4E5gbhvAq26BRwCUX53KsOEZkSlsm+g5pKH+lCxoVs+CtCXZjcGMWrwqzvucE2aPYKGuLjD+M8CDmTv6hnHCN42HOjC0IkF0NFm3f4xAFVjnc+CRltvfyLRb9peVvVdCsVvweHSd6EXB9186FtMApAbWj5lW4U4HfbSLO5/pivV4vPG36SXYP2xvnTxabq2QbxTdriMReLKCvYm4Au/0wM78XbzeR9t/nIp2uFLfcjqGRbNcXmB7PSzo3bZLsv+QIL2FjW4ff1iY04WVuTgS2Jkq2evPFGWv9UzmqrufxfAMN6M0AxCZ8z23eevX77z+qRzLCG70FiVSIeJqt+vqPnw8PD3/83jnGkPRm/cNWKI2thdwjbABhTBOZUT8nTUcPzT+/Z2ak5oS961voaQTgqRkQ0drkHIz6Xw9NTw8PPz9nMqRO7/B+DfZLyn1UhIhRK98d7frngPAA+ef3tBHJPDEzvw22ZSV4zBIidLc1DfN8Mkj/ThC6jH98/pHCkHqVeHqt0bv5O1w5oINwBAEKHz9E2vIqR8Ymo4fmPwkj0jkqegKx0et9+UrsYI15JEiO6MwOVvu8nJVy08CQzVhDujX0w01E17j5tELEVC7J44cyRHceuGqt+3YOtfrHhCU8QP7zl7gRcB+Svbn2HpFtXM/nr99uV7KnZMWA8ied3f2k1qp9tJ4hxObk4ef//i/4i3tSq8ODznQTluaRfAmih3m83kBCF3Ly/IYrGZ5WT/fOgRjEHGQ+CQhdxsl2mvqEZ/dShcq2KbKib0h+p5ZM6V/hciqyaEjG85OUsbll9xdIlOVVQ6d+v1dlW68bv8SILuSvNy0RpMls00uqEyO+GHVHz+J4PEBua1rstaZDMM3L205LaNY9Gc/yiPwVF5FHvQzrlIT4zfAZ63ERWa+JgybNK00gnTIaxyHhwZBSZ33azcChzDJG4DuZcVcnZcREZP2FSzv0W/ey8Z2U8cWo04wx3vprR+2LyfPNiSeCNOucDBmjk5GMlyBwRqR/To9/++VJApLINYRiIrK5G2HafNPcXmGavyXHEGF8I2C81QIDTscp3yP4zpx4CxLGR+TTtjbO/yW7pxCba5Ib8ukEtjuFNCHgISIl9WNiFD32hAJzDWVIobfmkD7fQ4JcQxlSwHghhBVRromLyMlz0SNPKkmukUXkZCJdSzsnaYkIyYicOGoaktXQc9MuIeIhIl09716y99hFKD7X+EY06tvdpcF5is01hqPt7mV6ITWelzTX+HAX0J5JJO5rDOPi4TyJco2xu5SiHqepYA61K3pg+QnONUYZ/NMXmGuMt6KHlaPAvsa4mLYsiXYQ4SXWdqHAXFP0oPIVkGtKlEld8bmmVInG0YwPw5eix5SzuFxTrkTjqMa5aYnqvScWcFv0gHIXs6xYtkRT4fqa0iWaCptrjPT/OdXZi8k1pUs0FaavKV+iqdC5pkyz30ijkieaCpVrLmlJO4WIXHMpNwfTquSJpkLkmnImGkezkLCciaYS5ZqSJppKlGvKtFRKSyt5oqkEuaa0icaRWXcRS7eCQWq0M4xtCWdOpLTSZhklJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSWlc9G/AgJd3oNxKG4AAAAASUVORK5CYII=");
  const [param, setParam] = useState({
    storeName,
    storeType,
    logoStyle: '',
  });
  const options = [
    { label: '귀엽게', value: 'cute' },
    { label: '멋지게', value: 'nice' },
    { label: '화려하게', value: 'splendidly' },
    { label: '느낌있게', value: 'vibes' },
  ];
  const getImage = async () => {
    console.log("이미지 생성중... 약 15초 소요");
    const response = await axiosInstance.post(`/logos`, param);
    console.log(response.data.imageUrl);
    setAIImageURL(response.data.imageUrl);
  }

  const saveImage = async () => {
    console.log("이미지 저장 로직 실행중...")
  }
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedOptions([...selectedOptions, value]);
    } else {
      setSelectedOptions(selectedOptions.filter((option) => option !== value));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Selected Options:', selectedOptions);
    setParam({
      storeName: "",
      storeType: "",
      logoStyle: translateResult + ", " + selectedOptions + ", store logo style",
    });
    console.log(param)
    getImage();
  };
  const [selectedOptions, setSelectedOptions] = useState([]);

  return (
    <div className={styles.makeLogoModal}>
      <div className={styles.modalContent}>
        <div className={styles.aiImg}>
          <img src={aiImageURL} alt="aiImage" />
        </div>
        <div>
          <p>당신만의 로고를 만들어 보세요!</p>  
        </div>
        <div>
            <form onSubmit={handleSubmit}>
              {options.map((option) => (
                <div key={option.value}>
                  <label>
                    <input
                      type="checkbox"
                      value={option.value}
                      checked={selectedOptions.includes(option.value)}
                      onChange={handleCheckboxChange}
                    />
                    {option.label}
                  </label>
                </div>
              ))}
            <button type="submit" className={styles.moveButton}>
              다시 생성
            </button>
          </form>
        </div>
        <div>
          <button className={styles.moveButton} onClick={""}>
            맘에 들어요!
          </button>
          <button className={styles.moveButton} onClick={closeMakeLog}>
            X
          </button>
        </div>
      </div>
    </div>
  );
};

export default MakeLogo;
