import Item from './components/item'
import Footer from './components/Footer'

import './common/style/index.css'
import './common/style/base.css'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoData: [],
      inputVal: '',
      view: 'all'
    };
    this.handleKeyDownPost = this.handleKeyDownPost.bind(this);
    this.onDestroy = this.onDestroy.bind(this);
    this.onClearCompleted = this.onClearCompleted.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.toggleAll = this.toggleAll.bind(this);
    this.onToggle = this.onToggle.bind(this);
    this.changeView = this.changeView.bind(this);
    this.itemEditDown = this.itemEditDown.bind(this);
  }

  itemEditDown(todo, val) {
    let {todoData} = this.state;
    todoData = todoData.map(item => {
      if(item.id === todo.id) {
        item.value = val;
      }
      return item;
    })
  }

  changeView(view) {
    this.setState({
      view
    })
  }

  handleKeyDownPost(ev) {
    if (ev.keyCode !== 13) return;

    const {inputVal} = this.state;
    const value = inputVal.trim(); 

    if (value === '') return;

    let todo = {}
    todo.id = new Date().getTime();
    todo.value = value;
    todo.hasCompleted = false;

    let { todoData } = this.state;
    todoData.push(todo);
    this.setState({
      todoData,
      inputVal: ''
    });
  }

  toggleAll(ev) {
    let {checked} = ev.target;
    let {todoData} = this.state;
    todoData = todoData.map(item => {
      item.hasCompleted = checked;
      return item;
    })

    this.setState({
      todoData
    })
  }

  onToggle(todo) {
    let {todoData} = this.state;
    todoData = todoData.map(item => {
      if (item.id === todo.id) {
        item.hasCompleted = !item.hasCompleted;
      }
      return item;
    });

    this.setState({
      todoData
    });
  }

  onDestroy(todo) { 
    let { todoData } = this.state;

    todoData = todoData.filter((item) => {
      return item.id !== todo.id;
    });

    this.setState({
      todoData
    });
  }

  onClearCompleted() {
    let { todoData } = this.state;

    todoData = todoData.filter((item) => {
      return !item.hasCompleted;
    }); 

    this.setState({
      todoData
    });
  }

  inputChange(ev) {
    const value = ev.target.value;

    this.setState({
      inputVal: value
    })
  }

  render() {
    let { handleKeyDownPost,  onDestroy, onClearCompleted,
       inputChange, toggleAll, onToggle, changeView,
       itemEditDown  } = this;
    let { todoData, inputVal, view } = this.state;
    let leftCount = todoData.length;
    let footer = null,
        itemBox = null;

    let todoFilter = todoData.filter((item) => {
      if (item.hasCompleted) leftCount --;
      switch (view) {
        case 'active':
          return !item.hasCompleted;
        case 'completed':
          return item.hasCompleted;
        default:
          return true;
      }
    })

    let todoDom = todoFilter.map((item, i) => {
      return (
        <Item
          {...{
            onDestroy,
            todo: item,
            onToggle,
            itemEditDown
          }}
          key={i}
        />
      )
    })

    if (todoData.length) {
      footer = (
        <Footer
          { ...{
            view,
            showClearBtton: leftCount < todoData.length,
            leftCount,
            onClearCompleted,
            changeView
          }}
        />
      )
      itemBox = (
        <section className="main">
          <input  
            type="checkbox"
            className="toggle-all"
            checked={leftCount === 0}
            onChange={toggleAll}
          />
          <ul className="todo-list">
            {todoDom}
          </ul>
        </section>
      )
    }
    
    return (
      <div>  
        <header className="header">
          <h1>todos</h1>
          <input  
            type="text" 
            onKeyDown={handleKeyDownPost} 
            className="new-todo"
            onChange={inputChange}
            value={inputVal}
          />
        </header>
        {itemBox}
        {footer}
      </div>
    )
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);

