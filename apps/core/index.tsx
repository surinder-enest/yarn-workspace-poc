import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Video, VideoModel } from '@mindme/shared';

const App = () => {
  const video = VideoModel.deserialize({
    ButtonText: "Play Video",
    LinkType: "EmbedCode",
    Style: {
      Background: {
        BackgroundColor: { HexValue: "#ffde5a", RgbValue: { R: 255, G: 222, B: 90, A: 1 } },
        BackgroundRepeat: "0",
        BackgroundType: "Solid",
        ImagePosition: "0",
        Opacity: 0,
        Url: "",
        Size: ""
      },
      Button: {
        TextColor: { HexValue: "#57AC2D", RgbValue: { R: 87, G: 172, B: 45, A: 1 } },
        BackgroundColor: {
          HexValue: "#FFFF",
          RgbValue: { R: 255, G: 255, B: 255, A: 1 }
        },
        BorderColor: { HexValue: "#57AC2D", RgbValue: { R: 87, G: 172, B: 45, A: 1 } },
        BorderRadius: 5,
        BorderSize: 2,
        ElementBorderStyles: "Solid"
      },
      ElementBorderStyle: {
        ElementBorderStyles: "None",
        BorderSize: 0,
        BorderColor: { HexValue: "#000000", RgbValue: { R: 0, G: 0, B: 0, A: 1 } }
      },
      FieldsStyle: {
        FieldLabelTextColor: { HexValue: "#ffde5a", RgbValue: { R: 255, G: 222, B: 90, A: 1 } },
        FieldTextColor: { HexValue: "#ffde5a", RgbValue: { R: 255, G: 222, B: 90, A: 1 } },
        FieldBackgroundColor: { HexValue: "#ffde5a", RgbValue: { R: 255, G: 222, B: 90, A: 1 } },
        ElementBorderStyles: "",
        BorderColor: { HexValue: "#ffde5a", RgbValue: { R: 255, G: 222, B: 90, A: 1 } },
        BorderRadius: "",
        BorderSize: ""
      },
      InterestStyles: {
        TextColor: { HexValue: "#ffde5a", RgbValue: { R: 255, G: 222, B: 90, A: 1 } },
        BackgroundColor: { HexValue: "#ffde5a", RgbValue: { R: 255, G: 222, B: 90, A: 1 } },
      }, 
      Align: "",
      Position:{
        TopPadding: "",
        BottomPadding:  "",
        RightPadding:  "",
        LeftPadding: "",
        TopMargin:  "",
        BottomMargin:  ""
      }
    },
    Url: '<iframe src="https://www.youtube.com/embed/jNQXAC9IVRw?loop=1&modestbranding=1" width="560" height="315" frameborder="0" allowfullscreen=""><p><a  id="vM2xYZ0T" href="https://www.ihertfordshire.co.uk">iHertfordshire UK</a><a  id="vM2xYZ0T" href="https://www.rockpamperscissors.co.uk/a-new-one-on-me/">https://www.rockpamperscissors.co.uk/a-new-one-on-me/</a></p><script type="text/javascript">function execute_YTvideo(){return youtube.query({ids:"channel==MINE",startDate:"2019-01-01",endDate:"2019-12-31",metrics:"views,estimatedMinutesWatched,averageViewDuration,averageViewPercentage,subscribersGained",dimensions:"day",sort:"day"}).then(function(e){},function(e){console.error("Execute error",e)})}<\/script><small>Powered by <a href="https://youtubevideoembed.com/ ">Embed YouTube Video</a></small></iframe>',
    VideoShowType: "Video",
    VideoSourceType: "YouTube",
    // VideoThumbnailURL: "http://img.youtube.com/vi/0NLQ33icfpY/0.jpg"
  });
  return (
    <div>
      <p>This is playgroud for testing the componets from the shared workspace</p>
      <Video video={video} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
