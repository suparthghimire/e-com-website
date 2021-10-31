export default function SingleCategory(props) {
  return (
    <div className="single-category">
      <figure className="category-image-wrapper-large">
        <img src={props.category.featured_image} alt={props.category.title} />
      </figure>
      <h5>{props.category.title}</h5>
    </div>
  );
}
