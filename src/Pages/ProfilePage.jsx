import React from "react";

export default class ProfilePage extends React.Component {

    state = {
        isDrawerOpen: false,
        viewMore: false,
    };

    toggleViewMore = () => {
        this.setState(state => ({
            viewMore: !state.viewMore,
        }));
    }

    render() {
        return (
            <div>
                <h2>Profile</h2>
                <p>
                    Proin eleifend condimentum nisl non mollis. Cras lacinia ante non nibh pharetra, in vehicula arcu varius. Nullam pulvinar dapibus suscipit. Mauris ultrices nibh elit, at sagittis est pulvinar ac. Maecenas ligula libero, rhoncus at purus eu, sollicitudin efficitur lectus. Pellentesque nec sem fringilla, mattis purus vel, condimentum orci. Ut lobortis tristique turpis id vestibulum. Ut malesuada tincidunt dolor, nec ultrices nibh rutrum vel. Maecenas cursus lectus tellus, id fermentum velit lacinia eget. Sed accumsan leo id massa commodo rutrum. Vivamus venenatis, erat a congue auctor, nisi elit facilisis sapien, sed tincidunt massa dui dictum metus.
                </p>
                <div>
                    <button onClick={this.toggleViewMore}>View more</button>
                </div>
                { this.state.viewMore ? (
                    <div>
                        <p>
                            Nam eu felis id sem molestie tincidunt ac a mauris. Suspendisse potenti. Nam vitae nibh quam. Integer ultricies tempus felis, sit amet rutrum mauris viverra eu. Integer sed sem a magna interdum porta. Etiam pretium turpis at nunc gravida consectetur. Ut vel justo ullamcorper, porttitor eros sit amet, consequat enim. Nullam pulvinar mauris eu eros maximus convallis. Phasellus maximus nibh non sem sagittis feugiat. Pellentesque hendrerit, odio vel efficitur sollicitudin, nibh quam imperdiet libero, in maximus sapien nunc sit amet lacus.
                        </p>
                        <p>
                            Maecenas faucibus dui vel facilisis rhoncus. Vivamus nec justo sagittis, tempor enim non, viverra metus. Etiam in ultricies urna. Cras lacinia imperdiet orci, eu luctus diam aliquet vitae. Mauris porttitor cursus dui, at placerat justo maximus quis. Vivamus molestie rutrum magna, iaculis malesuada ipsum fringilla sit amet. Quisque id ante finibus lorem ultrices tristique. Sed tincidunt dapibus facilisis. Nam rutrum turpis non purus venenatis efficitur. Praesent elementum fermentum erat. Ut feugiat lectus ac nulla volutpat volutpat. Nulla a volutpat elit.
                        </p>
                        <p>
                            Proin eleifend condimentum nisl non mollis. Cras lacinia ante non nibh pharetra, in vehicula arcu varius. Nullam pulvinar dapibus suscipit. Mauris ultrices nibh elit, at sagittis est pulvinar ac. Maecenas ligula libero, rhoncus at purus eu, sollicitudin efficitur lectus. Pellentesque nec sem fringilla, mattis purus vel, condimentum orci. Ut lobortis tristique turpis id vestibulum. Ut malesuada tincidunt dolor, nec ultrices nibh rutrum vel. Maecenas cursus lectus tellus, id fermentum velit lacinia eget. Sed accumsan leo id massa commodo rutrum. Vivamus venenatis, erat a congue auctor, nisi elit facilisis sapien, sed tincidunt massa dui dictum metus.
                        </p>
                        <p>
                            Praesent hendrerit lorem lorem, non sollicitudin tortor consectetur ac. Mauris fermentum consequat mi a cursus. Etiam aliquet tincidunt libero id volutpat. Nunc ut eros at risus laoreet sodales. Nullam consequat risus ac iaculis tempus. Aenean fringilla nisl in tristique ultricies. Aliquam erat volutpat. Ut facilisis orci ut ex sodales, a rutrum lacus tempor. Ut imperdiet eleifend libero, in commodo felis dapibus id. Maecenas viverra metus dolor, a vestibulum tellus vestibulum sit amet. Vivamus consectetur sit amet urna eu consequat. Quisque quis orci vel massa tempus ultrices.
                        </p>
                    </div>
                ) : null }
                END
            </div>
        );
    }
}
