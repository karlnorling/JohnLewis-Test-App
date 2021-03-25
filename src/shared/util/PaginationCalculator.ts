export class PaginationCalculator {
  totalPages: number;
  pageEdges: number;

  constructor(totalPages, pageEdges) {
    this.totalPages = totalPages;
    this.pageEdges = pageEdges;
  }

  private PREVIOUS_PAGE = 'PREVIOUS_PAGE';
  private NEXT_PAGE = 'NEXT_PAGE';

  range = (from, to, step = 1) => {
    let i = from;
    const range = [];
  
    while (i <= to) {
      range.push(i);
      i += step;
    }
  
    return range;
  }

  getPages = (currentPage) => {
    const totalPages = this.totalPages;
    const pageEdges = this.pageEdges;
    const totalNumbers = (this.pageEdges * 2) + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageEdges);
      const endPage = Math.min(totalPages - 1, currentPage + pageEdges);
      let pages = this.range(startPage, endPage);

      const hasLeftSpill = startPage > 2;
      const hasRightSpill = (totalPages - endPage) > 1;
      const spillOffset = totalNumbers - (pages.length + 1);

      switch (true) {
        case (hasLeftSpill && !hasRightSpill): {
          const extraPages = this.range(startPage - spillOffset, startPage - 1);
          pages = [this.PREVIOUS_PAGE, ...extraPages, ...pages];
          break;
        }
        case (!hasLeftSpill && hasRightSpill): {
          const extraPages = this.range(endPage + 1, endPage + spillOffset);
          pages = [...pages, ...extraPages, this.NEXT_PAGE];
          break;
        }
        case (hasLeftSpill && hasRightSpill):
        default: {
          pages = [this.PREVIOUS_PAGE, ...pages, this.NEXT_PAGE];
          break;
        }
      }

      return [1, ...pages, totalPages];
    }

    return this.range(1, totalPages);
  }
}