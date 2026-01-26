import React, { useState, Suspense } from 'react';
import LoginView from './components/LoginView';
import Loading from './components/Loading';

function App() {
  const [activeHomework, setActiveHomework] = useState(null);

  if (!activeHomework) {
    return <LoginView onLogin={setActiveHomework} />;
  }

  const HomeworkComponent = activeHomework.component;

  return (
    <Suspense fallback={<Loading />}>
      <HomeworkComponent />
    </Suspense>
  );
}

export default App;
