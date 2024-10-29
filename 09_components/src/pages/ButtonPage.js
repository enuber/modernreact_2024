import Button from '../components/Button';
import { GoBell, GoCloud, GoDatabase } from 'react-icons/go';

//remember if you say primary this is equivalent to primary=true important for the classnames library as it is basing what to show on truthy values
function ButtonPage() {
  const handleClick = () => {
    console.log('click!');
  };

  return (
    <div>
      <div>
        <Button primary onClick={handleClick}>
          <GoBell />
          Click Me
        </Button>
      </div>
      <div>
        <Button secondary>Buy Now</Button>
      </div>
      <div>
        <Button success outline>
          <GoCloud />
          See Deal
        </Button>
      </div>
      <div>
        <Button warning>
          <GoDatabase />
          Hide Ads
        </Button>
      </div>
      <div>
        <Button danger>oh no</Button>
      </div>
    </div>
  );
}

export default ButtonPage;
