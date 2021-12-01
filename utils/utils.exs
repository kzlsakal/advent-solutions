defmodule Utils do
  def load_input(file) do
    {file_name, folder} = file |> Path.split() |> List.pop_at(-1)
    challenge = file_name |> String.split(".") |> List.first()

    folder
    |> Kernel.++(["inputs/#{challenge}.txt"])
    |> Path.join()
    |> File.read!()
    |> String.split("\n")
  end

  def run(function, file, label) do
    args = System.argv()

    if "-b" in args do
      times_index = Enum.find_index(args, &(&1 == "-b")) + 1
      times = args |> Enum.at(times_index, "20") |> String.to_integer()
      benchmark(function, file, label, times)
    else
      execute(function, file, label)
    end
  end

  def execute(function, file, label) do
    input = load_input(file)

    fn -> function.(input) end
    |> :timer.tc()
    |> log_result(label)
  end

  def benchmark(function, file, label, times) do
    input = load_input(file)

    average_time =
      1..times
      |> Enum.map(fn _ ->
        fn -> function.(input) end
        |> :timer.tc()
        |> elem(0)
        |> Kernel./(1_000)
      end)
      |> Enum.reduce(
        [nil, 0],
        fn
          val, [nil, 0] -> [val, 1]
          val, [avg, count] -> [(avg * count + val) / (count + 1), count + 1]
        end
      )
      |> List.first()

    IO.puts("#{label} ran #{times} times with an average of #{average_time}ms")
  end

  defp log_result({time, result}, label) do
    IO.inspect(result, label: label)
    IO.puts("#{label} completed in #{time / 1_000}ms")
  end
end
