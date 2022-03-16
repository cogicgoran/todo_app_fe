import './Sidebar.css';
import AKLogo from '../../../assets/images/logo_AK.png';
import { OPTIONS } from '../../../helper/options.const';
import { useTodoContext } from '../../../context/todo/TodoContext';


function Sidebar(): JSX.Element {
  const {option, setOption} = useTodoContext();

  function handleOptionChange(option: string): void {
    setOption(option);
  }

  return (
    <aside className='sidebar'>
      <div className='sidebar__options-container'>
        <div className={['sidebar__option', option === OPTIONS.ALL ? 'active' : ''].join(' ')} onClick={() => handleOptionChange(OPTIONS.ALL)}>
          All
        </div>
        <div className={['sidebar__option', option === OPTIONS.ONGOING ? 'active' : ''].join(' ')} onClick={() => handleOptionChange(OPTIONS.ONGOING)}>
          Ongoing
        </div>
        <div className={['sidebar__option', option === OPTIONS.COMPLETED ? 'active' : ''].join(' ')} onClick={() => handleOptionChange(OPTIONS.COMPLETED)}>
          Completed
        </div>
      </div>
      <img className='sidebar-logo' src={AKLogo} alt="" />
    </aside>
  )
}

export default Sidebar