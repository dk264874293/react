let propTypes = {
    todo: PT.object,
    onDestroy: PT.func,
    onToggle: PT.func,
    itemEditDown: PT.func
}

export default class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            isEdit: false,
            val: ''
        };
        this.onEdit = this.onEdit.bind(this);
        this.onEnter = this.onEnter.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onEdit() {
        let {value} = this.props.todo;
        this.setState({
            isEdit: true,
            val: value
        },()=>{
            this.refs.editInput.focus();
        });
    }

    itemEditDown() {
        let {todo} = this.props;
        let {itemEditDown} = this.props;
        itemEditDown(todo, this.state.val);
        this.setState({
            isEdit: false
        })
    }

    onBlur() {
        this.itemEditDown();
    }

    onChange(ev) {
        let {value} = ev.target;
        let val = value.trim();
        if(val === '') return;
        this.setState({
            val 
        })
    }

    onEnter(ev) {
        if(ev.keyCode === 27) {
            this.setState({
                isEdit: false
            })
        }
        if(ev.keyCode !== 13) return;
        this.itemEditDown();
    }

    render() {
        let {todo, onDestroy, onToggle} = this.props;
        let {isEdit, val} = this.state; 
        let {onEdit, onEnter, onBlur, onChange} = this;
        let itemClassName = todo.hasCompleted ? 'completed' : '';
        if(isEdit) itemClassName += ' editing';
        return (
            <li className={itemClassName}>
                <div className="view">
                    <input 
                        type="checkbox" 
                        className="toggle"
                        checked={todo.hasCompleted}
                        onChange={(ev) => {onToggle(todo)}}
                    />
                    <label 
                        onDoubleClick={onEdit}
                    >
                        {todo.value}
                    </label>
                    <button 
                        className="destroy"
                        onClick={(ev) => {onDestroy(todo)}}
                    ></button>
                </div>
                <input 
                    type="text"
                    className="edit"
                    value={val}
                    onChange={onChange}
                    onBlur={onBlur}
                    onKeyDown={onEnter}
                    ref="editInput"
                />
            </li>
        );
    }
}

Item.propTypes = propTypes