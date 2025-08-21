
import { useEffect } from 'react';
import registerSW from './service/sw-install';
import PushBtn from "./PushBtn.tsx";


function App() {
    useEffect(() => {
        registerSW();
    }, []);

    return (
        <div className="App">
            <h1>Service Worker 테스트</h1>

            <PushBtn/>


        </div>

    );
}

export default App;