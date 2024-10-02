// globals.d.ts
// global.d.ts

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined; // This will be available globally
}

export {}; // This file needs to be treated as a module

  // Mongoose Global Variable Extension
  import { Mongoose } from 'mongoose';
  
  declare global {
    var mongoose: {
      conn: Mongoose | null;
      promise: Promise<Mongoose> | null;
    };
  }

  // global.d.ts
declare global {
  interface Window {
    webkitSpeechRecognition: any; // Allow TypeScript to recognize this
  }

  interface SpeechRecognitionResult {
    transcript: string;
    confidence: number;
  }

  interface SpeechRecognitionEvent {
    results: SpeechRecognitionResultList; // List of results
  }

  interface SpeechRecognitionResultList {
    [index: number]: SpeechRecognitionResult;
  }

  interface SpeechRecognitionError {
    error: string; // The error code (e.g., "no-speech", "aborted", etc.)
    message: string; // Detailed message about the error
  }
}

export {};
  