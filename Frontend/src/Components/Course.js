import React, { useEffect, useState } from "react";
import { NewsApi } from "../redux/actions/newsAction";
import { useDispatch, useSelector } from "react-redux";
import Ticker, { FinancialTicker, NewsTicker } from "nice-react-ticker";
import icon from "../../src/images/insta.png"; // add images, please make sure they can be set as src

const Course = () => {
  const dispatch = useDispatch();

  const [data, setData] = useState([]);

  const newsRes = useSelector((state) => state.newsReducer.token.data);
  console.log("newsRes... ", data);

  useEffect(() => {
    dispatch(NewsApi());
  }, []);

  useEffect(() => {
    if (newsRes && newsRes.data) {
      setData(newsRes.data);
    }
  }, [newsRes]);
  return (
    // <div className="center2">
    //   <h1 className="annoucument">News And Announcement</h1>
    // </div>
    <div className="center2">
      {data &&
        data.map((item) => (
          <div className="margque">
            <marquee width="100%" direction="left" height="300px">

              <div className="contain">
              <div className="heading_description">
                <h1>{`${item.Heading} ${item.startTime}`}</h1>
                <div className="shadowbox">
                  <p className="para">{item.Description}</p>
                </div>
              </div>
              </div>
             
            </marquee>
          </div>
        ))}
      {/* <Ticker>
      <FinancialTicker id="1" change={true} symbol="S&P 500" lastPrice="3372.2" percentage="0.38%" currentPrice="12.9" /> */}
      {/* <FinancialTicker id="2" change={true} symbol="AAPL" lastPrice="3372.2" percentage="0.38%" currentPrice="12.9" />
      <FinancialTicker id="3" change={true} symbol="GOOG" lastPrice="3372.2" percentage="0.38%" currentPrice="12.9" />
      <FinancialTicker id="4" change={false} symbol="S&P 500" lastPrice="3372.2" percentage="0.38%" currentPrice="12.9" />
      <FinancialTicker id="5" change={false} symbol="S&P 500" lastPrice="3372.2" percentage="0.38%" currentPrice="12.9" />
      <FinancialTicker id="6" change={false} symbol="S&P 500" lastPrice="3372.2" percentage="0.38%" currentPrice="12.9" /> */}
      {/* </Ticker> */}

      {/* {data &&
        data.map((item) => (
          <div className="newsticker">
            <Ticker isNewsTicker={true}>
              <NewsTicker
                id={item._id}
                icon={icon}
                title={item.Heading}
                url=" https://metro.co.uk/2020/02/22/blue-passports-issued-brits-first-time-decades-next-months-12281012/?ito=newsnow-feed"
                meta={item.startTime}
              />
            </Ticker>
          </div>
        ))} */}
    </div>
  );
};

export default Course;
