import EventSource, { EventSourceListener } from "react-native-sse";
import { SortDataState } from "../redux/redux/action/sortData";
import { SortReverseDataState } from "../redux/redux/action/sortReverseData";

type SSEParameter = {
  setSData: any,
  setSRData: any,
}

// 이 함수는 SSE 연동할 때 쓰는 환경 설정용 함수이다
const SSE = ({setSData, setSRData}:SSEParameter) => {
  // 여기서는 SSE Event Type과 맞춰야 하므로 custom을 써야한다.
  type FleaCustomEvents = "sse.contents_viewed" | "sse.auction_viewed";
  const source = new EventSource<FleaCustomEvents>("https://api.fleaauction.world/v2/sse/event");

  const listener: EventSourceListener<FleaCustomEvents> = (e: any) => {
    if (e.type === 'open') {
      // SSE를 연다
      console.log('open')
    } else if (e.type === 'message') {
      // event type이 message일 경우 수행
      console.log('message')
    } else if (e.type === 'sse.contents_viewed') {
      // event type이 sse.contents_viewed 일경우 수행
      // 현재 LogCat으로 확인할 경우 로그는 돌아가지만, 인증을 넣어야 수행 가능하다.
      console.log('sse.contents.viewed, 현재 403 에러로 연결 불가능')
    } else if (e.type === 'sse.auction_viewed') {
      // event type이 sse.auction_viewed일 경우 수행
      // 이부분이 핵심이 되는 부분이다.
      console.log('sse.auction_viewed')

      const d1 = JSON.parse(e.data) as SortDataState;
      const d2 = JSON.parse(e.data) as SortReverseDataState;

      setSData(d1)
      setSRData(d2)
      // setSData((prevData:SortDataState[]) => [...prevData, d1])
      // setSRData((prevData:SortReverseDataState[]) => [...prevData, d2])
      // addSortData(d1);
      // addSortReverseData(d2);
    }
  }

  source.addEventListener("open", listener);
  source.addEventListener("sse.auction_viewed", listener);
  source.addEventListener("sse.contents_viewed", listener);
  return () => {
    source.close();
  };
}

export default SSE;