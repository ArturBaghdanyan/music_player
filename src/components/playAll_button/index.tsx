import style from './style.module.scss';

export const PlayAllButton = () => {
  
    const handlePlayAll = () => {
      console.log('Playing all songs (simulated)');
    };
  
    return (
      <button onClick={handlePlayAll} className={style.play}>Play All</button>
    );
  };