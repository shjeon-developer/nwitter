import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  // firebase에서 정보 가져왔는지 확인
  const [init, setinit] = useState(false);
  // 유저 로그인 정보
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    // 유저 정보가 변경될 때 마다 실행 (추정)
    authService.onAuthStateChanged((user) => {
      if (user) {
        // 유저 정보 저장
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setUserObj(null);
      }
      setinit(true);
    });
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  };
  return (
    <>
      {/* firebase 접근전이면 initializing... 표시 */}
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
        />
      ) : (
        "Initializing..."
      )}
    </>
  );
}

export default App;
