// Define the Note component
function Note(props) {
    return (
        <div className="note">
            <h3>{props.title}</h3>
            <p>{props.content}</p>
        </div>
    );
}

// Define the App component
class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: [],
            newNoteTitle: "",
            newNoteContent: "",
            currentScreen: "home",
        };

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
        this.handleNoteSubmit = this.handleNoteSubmit.bind(this);
        this.handleScreenChange = this.handleScreenChange.bind(this);
    }

    handleTitleChange(event) {
        this.setState({ newNoteTitle: event.target.value });
    }

    handleContentChange(event) {
        this.setState({ newNoteContent: event.target.value });
    }

    handleNoteSubmit(event) {
        event.preventDefault();

        const newNote = {
            title: this.state.newNoteTitle,
            content: this.state.newNoteContent,
        };

        this.setState({
            notes: [...this.state.notes, newNote],
            newNoteTitle: "",
            newNoteContent: "",
        });
    }

    handleScreenChange(screen) {
        this.setState({ currentScreen: screen });
    }

    render() {
        const { notes, newNoteTitle, newNoteContent, currentScreen } = this.state;

        return (
            <div className="app">
                <nav>
                    <button onClick={() => this.handleScreenChange("home")}>Home</button>
                    <button onClick={() => this.handleScreenChange("create")}>Create Note</button>
                </nav>

                {currentScreen === "home" && (
                    <div className="notes">
                        {notes.length > 0 ? (
                            notes.map((note, index) => (
                                <Note
                                    key={index}
                                    title={note.title}
                                    content={note.content.slice(0, 50) + "..."}
                                />
                            ))
                        ) : (
                            <p>You haven't created any notes yet.</p>
                        )}
                    </div>
                )}

                {currentScreen === "create" && (
                    <form className="create-note-form" onSubmit={this.handleNoteSubmit}>
                        <label htmlFor="newNoteTitle">Title:</label>
                        <input
                            type="text"
                            id="newNoteTitle"
                            value={newNoteTitle}
                            onChange={this.handleTitleChange}
                        />

                        <label htmlFor="newNoteContent">Content:</label>
                        <textarea
                            id="newNoteContent"
                            value={newNoteContent}
                            onChange={this.handleContentChange}
                        ></textarea>

                        <button type="submit">Submit</button>
                    </form>
                )}
            </div>
        );
    }
}




ReactDOM.render(<App />, rootElement);
