import ALink from "~/components/features/custom-link";

export default function CategorySingle(props) {
  return (
    <div className="d-flex align-items-center justify-content-center">
      <ALink href={"/pages/category/" + props.category.slug}>
        <div className="category-item">
          <figure className="category-image-wrapper">
            <img src={props.category.featured_image} alt="" />
          </figure>
          <h2 className="category-text">{props.category.title}</h2>
        </div>
      </ALink>
    </div>
  );
}
