interface HeaederProps {
  name: string;
}

const Header = (props: HeaederProps) => {
  return <h1>{props.name}</h1>;
};

export default Header;
