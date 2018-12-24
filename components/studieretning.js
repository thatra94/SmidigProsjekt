import React from 'react';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            studie: []
        }
    }


    componentWillMount() {
        localStorage.getItem('') && this.setState({
            studie: JSON.parse(localStorage.getItem('')),
            isLoading: false
        })
    }



    fetchData() {

        this.setState({
            isLoading: true,
            studie: []
        })

        fetch('https://smidigprosjekt-e3cdc.firebaseio.com/')
            .then(response => response.json())
            .then(parsedJSON => parsedJSON.results.map(user => (
                {
                    name: `${user.name}`
                }
            )))
            .then(studie => this.setState({
                studie,
                isLoading: false
            }))
            .catch(error => console.log('parsing failed', error))

    }

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem('', JSON.stringify(nextState.studie));
        localStorage.setItem('', .now());
    }

