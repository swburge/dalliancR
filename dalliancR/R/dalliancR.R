#' <Add Title>
#'
#' <Add Description>
#'
#' @import htmlwidgets
#'
#' @export
dalliancR <- function(gene = "Sox2", dataset = NULL, reset_tracks = NULL, width = NULL,height=NULL) {

  # forward options using x
  x = list(
    gene = gene,
    dataset = dataset,
    reset_tracks = reset_tracks
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'dalliancR',
    x,
    width = width,
    height = height,
    package = 'dalliancR'
  )
}

#' Shiny bindings for dalliancR
#'
#' Output and render functions for using dalliancR within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a dalliancR
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name dalliancR-shiny
#'
#' @export
dalliancROutput <- function(outputId, width = '100%', height = '100%'){
  htmlwidgets::shinyWidgetOutput(outputId, 'dalliancR', width, height, package = 'dalliancR'
                                 )
}

#' @rdname dalliancR-shiny
#' @export
renderDalliancR <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, dalliancROutput, env, quoted = TRUE)
}


