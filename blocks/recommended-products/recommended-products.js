export default function decorate(block) {
    const cols = [...block.firstElementChild.children];
    block.classList.add(`column-${cols.length}-cols`);
  
    // Setup image and text columns
    [...block.children].forEach((row) => {
      [...row.children].forEach((col) => {
        const pic = col.querySelector("picture");
        document.querySelector(".column.block").style.display = "flex";
  
        if (pic) {
          const picWrapper = pic.closest("div");
          if (picWrapper && picWrapper.children.length === 1) {
            // Picture is only content in column
            picWrapper.classList.add("column-img-col", "image-block");
          }
        } else {
          // If no picture, assume it's a text block
          col.classList.add("text-block");
        }
      });
    });
  }
  