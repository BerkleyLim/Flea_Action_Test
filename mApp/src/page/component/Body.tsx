import React, { Component } from 'react'
import { Alert, Button, Text, View } from 'react-native';
import Header from './common/Header'
import EventSource from 'react-native-sse';
import { useQuery } from 'react-query';


// const fetchSSE = () => {
//   const eventSource = new EventSource(url);

//   eventSource.onopen = () => {
//     // 연결 시 할 일
//   };

//   eventSource.onmessage = async (e) => {
//     const res = await e.data;
//     const parsedData = JSON.parse(res);

//     // 받아오는 data로 할 일
//   };

//   eventSource.onerror = (e: any) => {
//     // 종료 또는 에러 발생 시 할 일
//     eventSource.close();

//     if (e.error) {
//       // 에러 발생 시 할 일
//     }

//     if (e.target.readyState === EventSource.CLOSED) {
//       // 종료 시 할 일
//     }
//   };
// };

const Body = () => {
  // const result = useQuery('posts', postData);
  // const { data, error, isLoading } = result;

  // if (isLoading) return <Component>...</Component>;
  // if (error) return <Component>...</Component>;


  const source = new EventSource("https://api.fleaauction.world/v2/sse/event");

  // sse 열기
  // 연결 시 할일
  source.addEventListener('open', () => {
    // eslint-disable-next-line no-console
    console.log('Open SSE connection.');
  })

 
  const { isLoading, isError, data } = useQuery({
    queryKey: ['userLog'],
    queryFn: () =>
      // 받아오는 data로 할 일
      source.addEventListener('message', (e: any) => {
        // eslint-disable-next-line no-console
        // console.log({ val: e.data, type: e.type });
        return e;
      })
  });

  //   eventSource.onerror = (e: any) => {
//     // 종료 또는 에러 발생 시 할 일
//     eventSource.close();

//     if (e.error) {
//       // 에러 발생 시 할 일
//     }

//     if (e.target.readyState === EventSource.CLOSED) {
//       // 종료 시 할 일
//     }
//   };
// };

  if (isLoading) return <Component>Loading...</Component>;
  if (isError) return <Component>Is is Error!</Component>;

  return (
    <View>
      <Header></Header>
      {/* 아래에 sse로 연동한 데이터 뿌리기 테스트 용도 */}
      <Text>{JSON.stringify(data)}</Text>
      <Button title={"hi"} 
          // onPress=}
      ></Button>
    </View>
  )
}

export default Body;