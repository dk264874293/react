let propTypes = {
    view: PT.oneOf(['all','active','completed']),
    showClearBtton: PT.bool,
    leftCount: PT.number,
    onClearCompleted: PT.func,
    changeView: PT.func
}

export default class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        const { showClearBtton, leftCount, onClearCompleted, view, changeView } = this.props;
        let clearButton = null
        if (showClearBtton) {
            clearButton = (
                <button onClick={onClearCompleted} className="clear-completed">
                    clear all completed
                </button>
            )
        }
        return (
            <footer className="footer">
                <span className="todo-count">
                    <strong>{leftCount}</strong>
                    <span>item left</span>
                </span>
                <ul className="filters">
                    <li>
                        <a 
                            href="#/all"
                            className={view === 'all' ? 'selected' : ''}
                            onClick={() => changeView('all')}
                        >All</a>
                    </li>
                    <li>
                        <a 
                            href="#/all"
                            className={view === 'active' ? 'selected' : ''}
                            onClick={() => changeView('active')}
                        >Active</a>
                    </li>
                    <li>
                        <a 
                            href="#/all"
                            className={view === 'completed' ? 'selected' : ''}
                            onClick={() => changeView('completed')}
                        >Completed</a>
                    </li>
                </ul>
                {clearButton}
            </footer>
        );
    }
}
Footer.propTypes = propTypes