import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import React from "react";
import Link from "next/link"; // Import Link from next/link
import { usePathname } from "next/navigation";

function BreadcrumbContainer() {

  const pathName = usePathname()

  // Parse the pathName into an array of path segments
  const pathParts = pathName.split("/").filter(Boolean);

  // Create an array of breadcrumb items
  const breadcrumbItems = pathParts.map((part, index) => {
    // Construct the href for each breadcrumb link
    const href = "/" + pathParts.slice(0, index + 1).join("/");

    // Determine if this is the last item in the breadcrumb
    const isLastItem = index === pathParts.length - 1;

    // Capitalize the first letter of each part for better display
    const displayPart = part.charAt(0).toUpperCase() + part.slice(1);

    // Return the breadcrumb item
    return (
      <React.Fragment key={index}>
        {index > 0 && (
          <BreadcrumbSeparator>
            {">"}
          </BreadcrumbSeparator>
        )}
        <BreadcrumbItem>
          {isLastItem ? (
            <BreadcrumbPage>{displayPart}</BreadcrumbPage>
          ) : (
            <BreadcrumbLink as={Link} href={href}>
              {displayPart}
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
      </React.Fragment>
    );
  });

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
          {">"}
          </BreadcrumbSeparator>
          {/* Render dynamic breadcrumb items */}
          {breadcrumbItems}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}

export default BreadcrumbContainer;
