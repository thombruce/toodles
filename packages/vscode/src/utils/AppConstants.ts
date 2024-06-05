export default class AppConstants {
  public static readonly ACCEPTED_FILENAMES = [
    'todo.txt',
    'done.txt'
  ];

  public static readonly FILENAMES_REGEX = /.+\.(?:todo|shop|list)$/;

  public static ARCHIVE_FILENAME = 'done.txt';
  public static TODO_FILENAME = 'todo.txt';

  public static DATE_REGEX = new RegExp(/\d{4}-\d{2}-\d{2}/g);
  public static PROJECT_REGEX = new RegExp(/\B\+\w+/g);
  public static CONTEXT_REGEX = new RegExp(/\B\@\w+/g);
  public static HASHTAG_REGEX = new RegExp(/\B\#\w+/g);
  public static PRICE_REGEX = new RegExp(/\B[$£€]\d*\.?\d*/g); // TODO: Support comma separator and additional currencies; possibly allow user configuration; possibly also support negative currencies with different style if it seems applicable
  public static PRIORITY_REGEX = new RegExp(/[(][A-Z][)]/g);
  public static DUE_REGEX = new RegExp(/due\s*:\d{4}-\d{2}-\d{2}/g);
}
