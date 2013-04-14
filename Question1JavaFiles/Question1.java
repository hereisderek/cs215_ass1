import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;

/**
 * Application class for Assignment 1, Question 1, compsci215 2013
 * 
 * Turnaround time = completion time - arrival time
 * Waiting time = Turnaround time - CPU time taken by the process
 */
public class Question1 {

	public static void main(String[] args) throws IOException {
		// Process command line arguments
		// read the file

		BufferedReader reader = new BufferedReader(new FileReader(new File(
				args[0])));

		JobFinishEvent callback = new JobFinishEvent() {
			@Override
			public void onFinish(Job j) {
				// this will be called when a job is finished.
				//System.out.println(j.getId() + "\t|" + j.getCPUTime() - j.getEndTime());
				//System.out.println(j.getId() + "\t\t |" + (j.getEndTime() - j.getSubmitTime()) + "\t\t |" + ( j.getEndTime() - j.getSubmitTime() - j.getCPUTime()));
				System.out.println((j.getId()+"              ").substring(0,11)+"|" + 
						((j.getEndTime() - j.getSubmitTime())+"                      ").substring(0,17)+"|" + 
						+ (j.getEndTime() - j.getSubmitTime() - j.getCPUTime()));
				System.out.println("--------------------------------------------");
			}
		};

		/*
		 * String arguments[];// = new String[]; ArrayList<Job> jobs = new
		 * ArrayList<Job>(); while ((arguments = reader.readLine().split(","))
		 * != null && arguments[0] != null){ System.out.println(arguments[0] +
		 * " " + arguments[1] + " " + arguments[2]); jobs.add(new
		 * Job(Integer.parseInt(arguments[0]), Integer.parseInt(arguments[1]),
		 * Integer.parseInt(arguments[2]), callback)); }
		 */

		String line;
		ArrayList<Job> jobs = new ArrayList<Job>();
		while ((line = reader.readLine()) != null) {
			String arguements[] = line.split(",");
//			System.out.println(arguements[0] + " " + arguements[1] + " "
//					+ arguements[2]);
			jobs.add(new Job(Integer.parseInt(arguements[0]), Integer
					.parseInt(arguements[1]), Integer.parseInt(arguements[2]),
					callback));
		}

		if (args[1].equals("FCFS")) {
			FirstComeFirstServed fcfs = new FirstComeFirstServed(jobs);
			fcfs.run();
		} else if (args[1].equals("SRT")) {
			ShortestRemainingTime srt = new ShortestRemainingTime(jobs);
			srt.run();
		} else if (args[1].equals("RR")) {
			RoundRobin rr = new RoundRobin(jobs);
			rr.run();
		} else {
			System.err.println("error: unrecongnizeable");
		}

		/*
		 * // example job addition: ArrayList<Job> jobs = new ArrayList<Job>();
		 * jobs.add(new Job(1, 0, 2, callback)); jobs.add(new Job(2, 1, 3,
		 * callback)); FirstComeFirstServed fcfs = new
		 * FirstComeFirstServed(jobs); fcfs.run();
		 */
	}

}
