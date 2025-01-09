const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div className="arrow prev-arrow" onClick={onClick}>
      ❮
    </div>
  );
};

export default PrevArrow;
