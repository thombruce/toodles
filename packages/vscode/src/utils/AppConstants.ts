export default class AppConstants {
  public static readonly FILENAMES_REGEX = /.+\.(?:todo|shop|list)$/;

  public static readonly OTHER_FILENAMES = [
    'todo.txt',
    'done.txt'
  ];

  public static PRIORITY_REGEX = new RegExp(/(?<=^\W*(?:x )?)\([A-Z]\)/g);
  public static DATE_REGEX = new RegExp(/(?<=^\W*(?:x )?(?:\([A-Z]\) )?(?:\d{4}-\d{2}-\d{2} ){0,2})\d{4}-\d{2}-\d{2}/g);
  public static CONTEXT_REGEX = new RegExp(/\B\@\w+/g);
  public static PROJECT_REGEX = new RegExp(/\B\+\w+/g);
  public static HASHTAG_REGEX = new RegExp(/\B\#\w+/g);
  public static TAG_REGEX = new RegExp(/\b\w+:[^ ]+/g); // TODO: Allow additional characters  
  public static PRICE_REGEX = new RegExp(/\B[$£€]\d*\.?\d*/g); // TODO: Support comma separator and additional currencies; possibly allow user configuration; possibly also support negative currencies with different style if it seems applicable
}
