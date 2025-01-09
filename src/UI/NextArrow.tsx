const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div className="arrow next-arrow" onClick={onClick}>
      ❯
    </div>
  );
};

export default NextArrow;
