import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { withRouter } from "next/router";
import { useQuery } from "react-query";

import CustomLoader from "~/components/common/custom-loader";
import { GET_PAGE_DETAILS } from "~/api/queries";

function Singlepage() {
  const router = useRouter();
  const slug = router.query.singlepage_slug;

  // GET_PAGE_DETAILS({
  //   slug,
  // });
  const { data, status } = useQuery(
    ["single-page-data", { slug }],
    GET_PAGE_DETAILS
  );

  if (status === "loading") return <CustomLoader type="Grid" />;
  return (
    <>
      <center>
        <h1>{data.title}</h1>
      </center>

      <div
        className="container"
        dangerouslySetInnerHTML={{ __html: data.content }}
      />
    </>
  );
}

export default React.memo(Singlepage);
