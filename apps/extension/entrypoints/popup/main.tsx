import { render } from 'preact';
import './popup.css';

function Popup() {
  return (
    <main class="popup">
      <h1>Sandport</h1>
      <p>Your development workspace, at hand.</p>
    </main>
  );
}

render(<Popup />, document.getElementById('app')!);
