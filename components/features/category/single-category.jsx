export default function SingleCategory(props) {
  return (
    <div className="single-category">
      <figure className="category-image-wrapper-large">
        <img src={props.category.featured_image} alt={props.category.title} />
      </figure>
      <span className="pb-0 font-weight-bold" style={{ fontSize: "1.8rem" }}>
        {props.category.title}
      </span>
    </div>
  );
}
