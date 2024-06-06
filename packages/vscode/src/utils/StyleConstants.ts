import colors from './colors'

export default class StyleConstants {
  // Priorities
  public static readonly PRIORITY_DARK = colors['violet']['200'];
  public static readonly PRIORITY_LIGHT = colors['violet']['900'];

  // Dates
  public static readonly DATE_DARK = colors['yellow']['200'];
  public static readonly DATE_LIGHT = colors['yellow']['900'];

  // Context
  public static readonly CONTEXT_DARK = colors['lime']['200'];
  public static readonly CONTEXT_LIGHT = colors['lime']['900'];

  // Project
  public static readonly PROJECT_DARK = colors['blue']['200'];
  public static readonly PROJECT_LIGHT = colors['blue']['900'];

  // Tag
  public static readonly TAG_DARK = colors['grape']['200'];
  public static readonly TAG_LIGHT = colors['grape']['900'];

  // Hashtag
  public static readonly HASHTAG_DARK = colors['orange']['200'];
  public static readonly HASHTAG_LIGHT = colors['orange']['900'];

  // Prices
  public static readonly PRICE_DARK = colors['green']['200'];
  public static readonly PRICE_LIGHT = colors['green']['900'];

  // Completed
  public static readonly COMPLETED_CSS = 'font-style: italic; text-decoration: line-through; opacity: 0.5;';
}
