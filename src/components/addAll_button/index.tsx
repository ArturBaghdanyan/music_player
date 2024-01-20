import style from './style.module.scss';

export const AddAllButton = () => {
    const handleAddAll = () => {
      // Simulate adding all songs to a queue
      console.log('Adding all songs to queue (simulated)');
    };
  
    return (
      <button onClick={handleAddAll} className={style.add_queue}>Add All to Queue</button>
    );
  };