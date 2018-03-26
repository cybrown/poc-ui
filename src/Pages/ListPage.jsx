import React from "react";

export default class ListPage extends React.Component {

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
                <h2>List</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sodales pretium erat eu condimentum. Etiam vel pretium augue. Vivamus sed arcu lectus. Donec non sapien at mauris malesuada tincidunt. Praesent ac semper ex. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec tincidunt porta justo a scelerisque. Mauris vitae felis sit amet nibh elementum vestibulum. Morbi tristique ullamcorper leo in finibus. Fusce ac blandit elit. Nullam consectetur eros nec risus mollis, at semper libero luctus. Quisque nec odio a urna blandit mattis.
                </p>
                <div>
                    <button onClick={this.toggleViewMore}>View more</button>
                </div>
                { this.state.viewMore ? (
                    <div>
                        <p>
                            Proin varius arcu eget sapien eleifend finibus. Nullam id scelerisque turpis. Fusce egestas faucibus quam et rutrum. Nunc lacinia sem sit amet elementum pellentesque. Mauris blandit hendrerit tempor. Morbi pharetra metus a congue pulvinar. Ut pretium porta sapien, a viverra dui ornare ut. Vivamus dapibus orci ut eros mattis pellentesque. Nunc pretium turpis et urna dictum pharetra. Donec ex eros, ullamcorper et mattis nec, fermentum et nunc. In ex mi, suscipit ut dui ac, pellentesque faucibus est. Morbi dolor tortor, pharetra pharetra lacus mattis, suscipit accumsan elit. Donec faucibus magna quis lacus gravida, nec sodales sapien viverra. Duis euismod, magna at maximus posuere, ligula libero pharetra ante, ut placerat mi nibh eget nisi. Cras fringilla dui tempor, vehicula ex sit amet, ullamcorper lectus.
                        </p>
                        <p>
                            Proin sed finibus tortor. Pellentesque nec odio erat. Nunc laoreet, tortor sollicitudin iaculis luctus, massa urna ultricies dolor, at faucibus nisi odio vitae nisi. Sed sapien nibh, hendrerit a convallis sit amet, fringilla in sapien. Nunc id suscipit mauris, fringilla fringilla nunc. Morbi nec dolor eget arcu imperdiet bibendum quis quis metus. Integer scelerisque et neque ut condimentum.
                        </p>
                        <p>
                            Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut pharetra orci ut venenatis eleifend. Nunc iaculis nisl justo, ut gravida lacus faucibus sit amet. Morbi maximus lorem sit amet finibus porttitor. Nullam interdum efficitur imperdiet. Etiam porttitor mi lectus, ut rutrum leo porttitor non. Aliquam erat volutpat. Nullam molestie velit orci. Donec malesuada orci eget risus facilisis finibus. In ultricies odio sit amet urna tempus mattis. Donec tempor lorem id purus viverra, vitae luctus sem placerat. Praesent hendrerit velit sed iaculis mollis. Morbi ornare nec augue eu ullamcorper. Integer suscipit ex nisi, in facilisis libero pulvinar eu. Nulla massa lectus, pretium nec risus vitae, viverra facilisis diam.
                        </p>
                        <p>
                            In id libero dui. Integer sit amet augue metus. Vestibulum efficitur vel dui et scelerisque. Integer augue erat, venenatis id vehicula id, blandit sed velit. Fusce scelerisque placerat egestas. Vivamus posuere magna est, et aliquet ligula commodo vitae. Donec pharetra lectus est, ullamcorper feugiat ante scelerisque vitae. Donec tempor felis sed sapien semper dignissim. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque ut cursus neque.
                        </p>
                    </div>
                ) : null }
                END
            </div>
        );
    }
}
