import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route } from 'react-router';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import './AppLayout.scss';

import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import SideDrawer from './SideDrawer';
import HomePage from '../Pages/HomePage';
import ListPage from '../Pages/ListPage';
import ProfilePage from '../Pages/ProfilePage';

export default class AppLayout extends React.Component {

    keys = [];
    currentKey = null;

    state = {
        isBackNavigation: false,
    };

    componentDidMount() {
        this.keys.push(this.history.location.key);
        this.unlisten = this.history.listen((state, action) => {
            if (action === 'PUSH') {
                this.setState({isBackNavigation: false});
                this.keys.push(state.key);
            } else if (action === 'POP') {
                const fromIndex = this.keys.indexOf(this.currentKey);
                const toIndex = this.keys.indexOf(state.key);
                if (fromIndex === -1) {
                    console.log('unknown from state');
                    location.reload();
                }
                if (toIndex === -1) {
                    console.log('unknown to state');
                    location.reload();
                }
                this.setState({isBackNavigation: fromIndex > toIndex});
                const $node = this.$transitionElement;
                $node.classList.add('force-position');
                setTimeout(() => $node.classList.remove('force-position'));
            }
            this.currentKey = this.history.location.key;
        })
    }

    componentWillUnmount() {
        if (this.unlisten) {
            this.unlisten();
        }
    }

    grabTransitionElement = elem => {
        if (elem) {
            this.$transitionElement = ReactDOM.findDOMNode(elem);
        }
    }

    render() {
        return (
            <div className="AppLayout">
                <AppHeader />
                <Route render={({location, history}) => (
                    this.history = history,
                    <TransitionGroup className={'AppLayout--content ' + (this.state.isBackNavigation ? 'AppLayout--navigation-previous' : '')}>
                        <CSSTransition
                            ref={this.grabTransitionElement}
                            key={location.pathname}
                            timeout={300}
                            classNames="AppLayout--content-animated"
                        >
                            <Switch location={location}>
                                <Route strict exact path="/" component={HomePage} />
                                <Route strict exact path="/list" component={ListPage} />
                                <Route strict exact path="/profile" component={ProfilePage} />
                                <Route render={() => (
                                    <div>not found</div>
                                )} />
                            </Switch>
                        </CSSTransition>
                    </TransitionGroup>
                )} />
                <AppFooter />
                <SideDrawer />
            </div>
        );
    }
}
