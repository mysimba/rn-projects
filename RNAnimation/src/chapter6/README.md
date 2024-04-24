## PanResponser 란?

    - gesture를 감지해서 response로 터치상태를 콜백해주는 API
    - 터치로 핸들링하는 컴포넌트는 많지만, 터치액션을 세세하게 인식해서 콜백해주는 경우는 많지 않음 (ScrollView, Flatlist, SectionList)
    - PanResponder는 x,y 터치좌표, 누적이동거리, 제스쳐의 속도, 현재 화면에 터치 갯수등의 정보를 콜백으로 던져줌

## Usage Pattern

    ```
    const ExampleComponent = () => {
      const panResponder = React.useRef(
        PanResponder.create({
          // Ask to be the responder:
          onStartShouldSetPanResponder: (evt, gestureState) => true,
          onStartShouldSetPanResponderCapture: (evt, gestureState) =>
            true,
          onMoveShouldSetPanResponder: (evt, gestureState) => true,
          onMoveShouldSetPanResponderCapture: (evt, gestureState) =>
            true,
    
          onPanResponderGrant: (evt, gestureState) => {
            // The gesture has started. Show visual feedback so the user knows
            // what is happening!
            // gestureState.d{x,y} will be set to zero now
          },
          onPanResponderMove: (evt, gestureState) => {
            // The most recent move distance is gestureState.move{X,Y}
            // The accumulated gesture distance since becoming responder is
            // gestureState.d{x,y}
          },
          onPanResponderTerminationRequest: (evt, gestureState) =>
            true,
          onPanResponderRelease: (evt, gestureState) => {
            // The user has released all touches while this view is the
            // responder. This typically means a gesture has succeeded
          },
          onPanResponderTerminate: (evt, gestureState) => {
            // Another component has become the responder, so this gesture
            // should be cancelled
          },
          onShouldBlockNativeResponder: (evt, gestureState) => {
            // Returns whether this component should block native components from becoming the JS
            // responder. Returns true by default. Is currently only supported on android.
            return true;
          },
        }),
      ).current;
    
      return <View {...panResponder.panHandlers} />;
    };
    ```

## Method Description

- onStartShouldSetPanResponder & onStartShouldSetPanResponderCapture
    - 이 메소드들은 사용자가 터치를 시작할 때 해당 뷰가 응답자(responder)가 될지 결정합니다.
    - onStartShouldSetPanResponderCapture는 onStartShouldSetPanResponder보다 먼저 호출되며, 이벤트 캡처 단계에서 처리됩니다. 즉, 자식
      컴포넌트보다 부모 컴포넌트에서 먼저 이벤트를 잡을 기회를 줍니다.

- onMoveShouldSetPanResponder & onMoveShouldSetPanResponderCapture
    - 사용자가 움직임을 시작할 때 이 뷰가 응답자가 될지를 결정합니다.
    - onMoveShouldSetPanResponderCapture는 onMoveShouldSetPanResponder보다 먼저 호출되며, 마찬가지로 이벤트 캡처 단계에서 처리됩니다.

- onPanResponderGrant
    - 이 뷰가 응답자가 되었을 때 호출됩니다. 이는 제스처가 시작됨을 사용자에게 피드백할 수 있는 기회를 제공합니다.

- onPanResponderMove
    - 사용자가 터치를 유지하며 움직일 때마다 호출됩니다. 이 메소드는 움직임에 대한 정보(gestureState 객체)를 제공하여, 예를 들어 드래그 & 드롭 기능을 구현할 때 사용될 수
      있습니다.

- onPanResponderRelease
    - 이 메서드는 사용자가 모든 터치를 놓았을 때 호출되며, 일반적으로 제스처가 성공적으로 완료되었음을 나타냅니다.

- onPanResponderTerminationRequest
    - 사용자가 모든 터치를 끝내고 손을 떼었을 때 호출됩니다. 제스처의 성공적 완료를 처리하기에 적합한 위치입니다.

- onPanResponderTerminate
    - 다른 컴포넌트가 응답자가 되어 현재의 응답자가 그 자격을 잃었을 때 호출됩니다. 예를 들어, 부모 뷰가 응답자가 되거나, 시스템에 의해 강제로 제스처가 종료되는 경우 등이 있습니다.

- onShouldBlockNativeResponder
    - 이 컴포넌트가 네이티브 컴포넌트가 JavaScript 응답자가 되는 것을 막을지 결정합니다. 기본적으로 true를 반환하며, 주로 Android에서만 지원됩니다.

## gestureState Description

* stateID - 제스처 상태의 ID. 화면에 적어도 하나의 터치가 있을 때까지 유지됩니다.
* moveX - 최근 이동한 터치의 최신 화면 좌표
* moveY - 최근 이동한 터치의 최신 화면 좌표
* x0 - 응답자가 부여된 화면 좌표
* y0 - 응답자가 부여된 화면 좌표
* dx - 터치가 시작된 이후 제스처의 누적 거리
* dy - 터치가 시작된 이후 제스처의 누적 거리
* vx - 제스처의 현재 속도
* vy - 제스처의 현재 속도
* numberActiveTouches - 현재 화면에 있는 터치의 수
