H5PEditor.InteractiveVideo.GuidedTours = (function ($) {

  // Shorthand for translate function:
  var t = H5PEditor.InteractiveVideo.t;
  /**
   * Defines the different tours in IV
   * @type {Array}
   */
  var tours = [
    // Upload video tab
    {
      steps: [
        {
          text: t('tourStepUploadIntroText'),
          attachTo: {element: '.field.wizard .h5peditor-label', on: 'bottom'},
          noArrow: true,
          classes: 'h5p-editor-iv-guide-intro'
        },
        {
          title: t('tourStepUploadFileTitle'),
          text: t('tourStepUploadFileText'),
          attachTo: {element: '.field.video .file', on: 'left'},
          highlightElement: true
        },
        {
          title: t('tourStepUploadAddInteractionsTitle'),
          text: t('tourStepUploadAddInteractionsText'),
          attachTo: {element: '.h5peditor-tab-assets', on: 'bottom'},
          highlightElement: true
        }
      ],
      options: {
        id: 'h5p-editor-interactive-video-initial-v1'
      }
    },
    // Interactions tab
    {
      steps: [
        {
          title: t('tourStepCanvasToolbarTitle'),
          text: t('tourStepCanvasToolbarText'),
          attachTo: {element: '.h5peditor-dragnbar', on: 'bottom'},
          highlightElement: true
        },
        {
          title: t('tourStepCanvasEditingTitle'),
          text: t('tourStepCanvasEditingText'),
          attachTo: {element: '.h5p-video-wrapper', on: 'center'},
          noArrow: true,
          scrollTo: true
        },
        {
          title: t('tourStepCanvasBookmarksTitle'),
          text: t('tourStepCanvasBookmarksText'),
          attachTo: {element: '.h5p-control.h5p-bookmarks', on: 'right'},
          highlightElement: true,
          scrollTo: true
        },
        {
          title: t('tourStepCanvasPreviewTitle'),
          text: t('tourStepCanvasPreviewText'),
          attachTo: {element: '.h5p-control.h5p-play', on: 'right'},
          highlightElement: true,
          scrollTo: true
        },
        {
          title: t('tourStepCanvasSaveTitle'),
          text: t('tourStepCanvasSaveText'),
          attachTo: {element: '.h5p-video-wrapper', on: 'center'},
          noArrow: true,
          scrollTo: true
        }
      ],
      options: {
        id: 'h5p-editor-interactive-video-interactions-v1'
      }
    },
    // Summary tab
    {
      steps: [
        {
          text: t('tourStepSummaryText'),
          attachTo: {element: '.h5peditor-tabs', on: 'bottom'},
          noArrow: true
        }
      ],
      options: {
        id: 'h5p-editor-interactive-video-summary-v1'
      }
    }
  ];

  var currentTourId;

  /**
   * @class H5PEditor.InteractiveVideo.GuidedTours
   */
  function GuidedTours () {}

  /**
   * Starts a guided tour
   *
   * @method GuidedTours.start
   * @static
   * @param  {number} tourId The index of the guide (as defined in the tours array)
   * @param  {boolean} force Force displaying the guide (even if it has been displayed before)
   */
  GuidedTours.start = function (tourId, force, t) {
    force = force || false;

    if ((tourId < 0 || (tourId+1) > tours.length) ||
        (tourId === currentTourId && tours[currentTourId].instance.isOpen())) {
      return;
    }

    // Hide guide if another guide is allready present - only one guide at a time
    if (currentTourId !== undefined) {
      tours[currentTourId].instance.hide();
    }

    var tour = tours[tourId];

    // Add labels:
    tour.options.labels = {
      exit: t('tourButtonExit'),
      done: t('tourButtonDone'),
      back: t('tourButtonBack'),
      next: t('tourButtonNext')
    }

    if (tour !== undefined) {
      if (tour.instance === undefined) {
        tour.instance = new H5P.GuidedTour(tour.steps, tour.options);
      }
      tour.instance.start(force, function () {
        currentTourId = tourId;
      });
    }
  };

  return GuidedTours;
})(H5P.jQuery);
