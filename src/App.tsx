
import { useEffect } from 'react';
import registerSW from './service/sw-install';

function App() {
    useEffect(() => {
        registerSW();
    }, []);

    return (
        <div className="App">
            <h1>Service Worker 테스트</h1>


        </div>

    );
}

export default App;