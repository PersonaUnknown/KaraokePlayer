// A/V
import './App.css';
// Views / Components
import TabBar from './views/tab_bar/TabBar';
import AudioPlayer from './views/audio_view/AudioPlayer';
import LyricView from './views/lrc_view/LyricView';
import MainView from './views/main_view/MainView';
// React
function App() {
  // Tabs
  const tabs: Array<React.ReactElement> = [
    <AudioPlayer/>,
    <LyricView/>,
    <span> 3 </span>,
    <span> 4 </span>
  ]
  // Render
  return (
    <div className="App">
      <TabBar 
        tabLabels={[{ label: "Audio Player" }]} 
        tabComponents={tabs}
        alignment='center'
        padding={10}
        gap={15}
        buttonStyle={{ 
          backgroundColor: 'transparent',
          borderColor: 'transparent',
          borderRadius: 50,
          fontSize: 30,
          paddingVertical: 10,
          paddingHorizontal: 20
        }}
        activeButtonStyle={{
          borderRadius: 50,
          fontSize: 30,
          paddingVertical: 10,
          paddingHorizontal: 20
        }}
      />
    </div>
  );
}

export default App;
