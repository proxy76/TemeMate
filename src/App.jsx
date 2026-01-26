import React, { useState } from 'react';
import LoginView from './components/LoginView';

function App() {
  const [activeHomework, setActiveHomework] = useState(null);

  if (!activeHomework) {
    return <LoginView onLogin={setActiveHomework} />;
  }

  const HomeworkComponent = activeHomework.component;

  return (
    <HomeworkComponent />
  );
}

export default App;
