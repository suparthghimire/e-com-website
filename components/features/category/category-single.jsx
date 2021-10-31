export default function CategorySingle(props) {
  console.log(props);
  return (
    <div className="category-item">
      <figure className="category-image-wrapper">
        <img src={props.category.featured_image} alt="" />
      </figure>
      <h2 className="category-text">{props.category.title}</h2>
    </div>
  );
}
