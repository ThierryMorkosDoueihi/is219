var today = new Date(),
            date = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();

var CommentList = React.createClass({
	render: function(){
		var createComment = function(item){
			return (<div key={item.id}>
						<h5><b><u><i>{item.author}</i> wrote on {date}:</u></b></h5> 
						<h5>{item.text}</h5>
					</div>);
		};
		return <div>{this.props.items.map(createComment)}</div>;
	}
});

var CommentForm = React.createClass({
	getInitialState: function(){
		return {items: [], author: '', text: ''};
	},
	
	onChangeAuthor: function(e){
		this.setState({author: e.target.value});
	},
	
	onChangeComment: function(e){
		this.setState({text: e.target.value});
	},
	
	handleSubmit: function(e){
		e.preventDefault();
		if(this.state.author == ''){
			var nextComment = this.state.items.concat([{
			author: "Unkown", 
			text: this.state.text,
			id: Date.now()
		}]);
		}else{
			var nextComment = this.state.items.concat([{
				author: this.state.author,
				text: this.state.text,
				id: Date.now()
			}]);
		}
			
		var nextAuthor = '';
		var nextText = '';
		
		this.setState({
			items: nextComment,
			author: nextAuthor,
			text: nextText
		});
	},
	
	render: function() {
		return (
			<div>
				<div className="row">
					<div className="twelve columns">
						<form onSubmit={this.handleSubmit}>
							<input className="u-full-width" type="text" placeholder="Your name" onChange={this.onChangeAuthor} value={this.state.author} />
							<input className="u-full-width" type="text" placeholder="Say something..." onChange={this.onChangeComment} value={this.state.text} />
							<button className="button-primary">Submit</button>
						</form>
					</div>
					<div id="commetingList" className="twelve columns">
						<CommentList items={this.state.items} />
					</div>
				</div>
			</div>
		);
	}
});

ReactDOM.render(
	<CommentForm />,
	document.getElementById('comment')
);